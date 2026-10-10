import { withBasePath } from '@/lib/site';

export default function RootPage() {
  const destination = withBasePath('/zh/');

  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${destination}`} />
      <main className="flex min-h-screen items-center justify-center p-6 text-center">
        <p>
          正在进入中文版教程……{' '}
          <a className="underline" href={destination}>
            若未自动跳转，请点这里
          </a>
        </p>
      </main>
    </>
  );
}
