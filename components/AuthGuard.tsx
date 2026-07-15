'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { currentUser } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);


  const whitelistPages = ['/login', '/signup', '/'];

  // 1. Zustand persist가 localStorage 데이터를 복구할 때까지 대기 (Hydration 매칭)
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // 2. 인증 체크 및 라우팅 처리
  useEffect(() => {
    if (!isHydrated) return;

    const publicPages = whitelistPages // 로그인 없이 접근 가능한 페이지
    const isPublicPage = publicPages.includes(pathname);

    if (!currentUser && !isPublicPage) {
      // 로그인 안 되었는데 보호된 페이지 접근 시 로그인 페이지로 이동
      router.replace('/login');
    } else if (currentUser && isPublicPage) {
      // 로그인 되었는데 로그인 페이지 접근 시 메인으로 이동
      router.replace('/');
    }
  }, [currentUser, isHydrated, pathname, router]);

  // Hydration이 완료되기 전이나, 비로그인 상태로 보호된 페이지에 있을 때는 아무것도 렌더링하지 않음 (깜빡임 방지)
  if (!isHydrated) return null;

  const publicPages = whitelistPages;
  if (!currentUser && !publicPages.includes(pathname)) return null;

  return <>{children}</>;
}