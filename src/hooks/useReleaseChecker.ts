import { useState, useEffect } from 'react';

interface ReleaseInfo {
  hasNewVersion: boolean;
  latestVersion: string;
  currentVersion: string;
  releaseUrl: string;
}

const CURRENT_VERSION = '1.0.5'; // package.json의 버전과 동일하게 유지
const GITHUB_API_URL = 'https://api.github.com/repos/cha2hyun/palet-ai/releases/latest';

// 버전 비교 함수 (1.0.4 > 1.0.3 => 1, 1.0.3 = 1.0.3 => 0, 1.0.2 < 1.0.3 => -1)
function compareVersions(v1: string, v2: string): number {
  const parts1 = v1.split('.').map(Number);
  const parts2 = v2.split('.').map(Number);

  const maxLength = Math.max(parts1.length, parts2.length);
  for (let i = 0; i < maxLength; i += 1) {
    const part1 = parts1[i] || 0;
    const part2 = parts2[i] || 0;

    if (part1 > part2) return 1;
    if (part1 < part2) return -1;
  }

  return 0;
}

export function useReleaseChecker() {
  const [releaseInfo, setReleaseInfo] = useState<ReleaseInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function checkForUpdates() {
      try {
        const response = await fetch(GITHUB_API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch release info');
        }

        const data = await response.json();
        const latestVersion = data.tag_name.replace('v', ''); // v1.0.4 -> 1.0.4
        const releaseUrl = data.html_url;

        if (isMounted) {
          setReleaseInfo({
            hasNewVersion: compareVersions(latestVersion, CURRENT_VERSION) > 0,
            latestVersion,
            currentVersion: CURRENT_VERSION,
            releaseUrl
          });
          setIsLoading(false);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to check for updates:', error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    // 3초 후에 체크 (초기 로딩 지연)
    const timer = setTimeout(checkForUpdates, 3000);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  return { releaseInfo, isLoading };
}

export default useReleaseChecker;
