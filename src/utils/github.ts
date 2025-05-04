const GITHUB_API_URL = 'https://api.github.com';

interface GitHubRepo {
  language: string;
  size: number;
  stargazers_count: number;
}

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface Week {
  contributionDays: {
    contributionCount: number;
    date: string;
  }[];
}

interface ContributionCalendar {
  totalContributions: number;
  weeks: Week[];
}

interface ContributionCollection {
  contributionCalendar: ContributionCalendar;
  totalCommitContributions: number;
  restrictedContributionsCount: number;
}

interface GraphQLResponse {
  data: {
    user: {
      contributionsCollection: ContributionCollection;
      repositoriesContributedTo: { totalCount: number };
      pullRequests: { totalCount: number };
      issues: { totalCount: number };
    };
  };
}

export interface GitHubStats {
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  totalStars: number;
  totalPRs: number;
  totalIssues: number;
  totalRepos: number;
  contributionGraph: ContributionDay[];
  languageStats: {
    name: string;
    percentage: number;
    color: string;
  }[];
}

export async function fetchGitHubStats(username: string): Promise<GitHubStats> {
  // User info and repos
  const [userResponse, reposResponse] = await Promise.all([
    fetch(`${GITHUB_API_URL}/users/${username}`),
    fetch(`${GITHUB_API_URL}/users/${username}/repos?per_page=100&sort=updated`)
  ]);

  const userData = await userResponse.json();
  const reposData = await reposResponse.json();

  // Calculate language stats
  const languageMap = new Map<string, number>();
  const languageColors: Record<string, string> = {
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Python: '#3572A5',
    Java: '#b07219',
    // Add more languages as needed
  };

  let totalSize = 0;
  for (const repo of reposData) {
    if (repo.language) {
      const currentSize = languageMap.get(repo.language) || 0;
      languageMap.set(repo.language, currentSize + repo.size);
      totalSize += repo.size;
    }
  }

  const languageStats = Array.from(languageMap.entries())
    .map(([name, size]) => ({
      name,
      percentage: Math.round((size / totalSize) * 100),
      color: languageColors[name] || '#858585'
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 4);

  // Calculate total stars
  const totalStars = reposData.reduce((acc: number, repo: GitHubRepo) => acc + repo.stargazers_count, 0);

  // Get contribution stats using GraphQL
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
          totalCommitContributions
          restrictedContributionsCount
        }
        repositoriesContributedTo(first: 1, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
          totalCount
        }
        pullRequests(first: 1) {
          totalCount
        }
        issues(first: 1) {
          totalCount
        }
      }
    }
  `;

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables: { username } }),
  });

  const { data } = await response.json() as GraphQLResponse;
  const calendar = data.user.contributionsCollection.contributionCalendar;

  // Process contribution graph data
  const contributionGraph: ContributionDay[] = [];
  calendar.weeks.forEach((week: Week) => {
    week.contributionDays.forEach((day) => {
      const count = day.contributionCount;
      let level = 0;
      if (count > 0) level = 1;
      if (count >= 5) level = 2;
      if (count >= 10) level = 3;
      if (count >= 15) level = 4;

      contributionGraph.push({
        date: day.date,
        count: day.contributionCount,
        level
      });
    });
  });

  return {
    totalContributions: calendar.totalContributions,
    contributionGraph,
    currentStreak: 0, // We'll need to calculate this from contribution calendar
    longestStreak: 0, // We'll need to calculate this from contribution calendar
    totalStars,
    totalPRs: data.user.pullRequests.totalCount,
    totalIssues: data.user.issues.totalCount,
    totalRepos: userData.public_repos,
    languageStats,
  };
}
