import fs from 'fs';

function testHeaderAndFooter() {
  const navbarCode = fs.readFileSync('src/components/shared/Navbar.jsx', 'utf8');
  const footerCode = fs.readFileSync('src/components/shared/Footer.jsx', 'utf8');
  const appCode = fs.readFileSync('src/App.jsx', 'utf8');
  const heroCode = fs.readFileSync('src/components/Hero.jsx', 'utf8');
  const liteHeroCode = fs.readFileSync('src/components/lite/LiteHero.jsx', 'utf8');
  const scrollBtnCode = fs.readFileSync('src/components/shared/ScrollToTopButton.jsx', 'utf8');

  const tests = [
    {
      name: 'Desktop nav links exclude Home',
      pass: navbarCode.includes('navLinks.filter((nav) => nav.path !== "/")') &&
            navbarCode.includes('desktopNavLinks.map('),
    },
    {
      name: 'Scroll progress bar (2px) removed from Navbar',
      pass: !navbarCode.includes('scrollYProgress') &&
            !navbarCode.includes('scaleX') &&
            !navbarCode.includes('h-[2px] origin-left'),
    },
    {
      name: 'Header uses wide screen spacing (max-w-[1600px])',
      pass: navbarCode.includes('max-w-[1600px]') && navbarCode.includes('xl:px-16'),
    },
    {
      name: 'Desktop logo size increased to 44px and name to text-[20px]',
      pass: navbarCode.includes('lg:w-[44px] lg:h-[44px]') &&
            navbarCode.includes('lg:text-[20px]'),
    },
    {
      name: 'Mobile logo reduced (w-[28px]) and full name always visible',
      pass: navbarCode.includes('w-[28px] h-[28px]') &&
            navbarCode.includes('Prathamesh Chiddarwar') &&
            !navbarCode.includes('<span className="sm:hidden">Prathamesh</span>'),
    },
    {
      name: 'Mobile header never disappears on scroll down (translate-y-0)',
      pass: !navbarCode.includes('isHeaderHidden') &&
            !navbarCode.includes('-translate-y-full') &&
            navbarCode.includes('translate-y-0'),
    },
    {
      name: 'Footer old Back to top button removed',
      pass: !footerCode.includes('Back to top') &&
            !footerCode.includes('scrollToTop'),
    },
    {
      name: 'Floating ScrollToTopButton component created and mounted in App.jsx',
      pass: appCode.includes('<ScrollToTopButton />') &&
            scrollBtnCode.includes('ScrollToTopButton') &&
            scrollBtnCode.includes('fixed bottom-6 right-6'),
    },
    {
      name: 'Hero and LiteHero text entrance guaranteed visible when loader inactive',
      pass: heroCode.includes('const isHeroVisible = appReady || !isLoading;') &&
            liteHeroCode.includes('const isHeroVisible = appReady || !isLoading;'),
    },
  ];

  let allPassed = true;
  tests.forEach((t) => {
    console.log(`[${t.pass ? 'PASS' : 'FAIL'}] ${t.name}`);
    if (!t.pass) allPassed = false;
  });

  if (!allPassed) {
    process.exit(1);
  }
  console.log('\nAll 9 header, footer & loader verification tests passed successfully!');
}

testHeaderAndFooter();

