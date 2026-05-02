import { useNavigate } from 'react-router-dom';
import NavItem from '../components/NavItem';
import { LayoutGrid, Gamepad2, Cog, EllipsisVertical, Heart, Zap } from 'lucide-react';
import { useOptions } from '/src/utils/optionsContext';
import pkg from '../../package.json';
import nav from '../styles/nav.module.css';
import theme from '../styles/theming.module.css';
import clsx from 'clsx';
import Logo from '../components/Logo';
import { memo, useMemo, useCallback, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const version = pkg.version;
const itemSize = 16;

const navItems = [
  { name: 'Apps', id: 'btn-a', type: LayoutGrid, route: '/materials' },
  { name: 'Games', id: 'btn-g', type: Gamepad2, route: '/docs' },
  { name: 'Settings', id: 'btn-s', type: Cog, route: '/settings' },
  { name: '', id: 'btn-d', type: EllipsisVertical, route: '#' }
];

const Nav = memo(() => {
  const navigate = useNavigate();
  const { options } = useOptions();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const scale = Number(options.navScale || 1);
  const dimensions = useMemo(
    () => ({
      navHeight: Math.round(69 * scale),
      logoWidth: Math.round(122 * scale),
      logoHeight: Math.round(41 * scale),
      versionFont: Math.round(9 * scale),
      versionMargin: Math.round(-10 * scale),
    }),
    [scale],
  );

  const handleLogoClick = useCallback(() => navigate('/'), [navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const items = useMemo(
    () =>
      navItems.map((item, index) => ({
        ...item,
        size: itemSize,
        onClick: (e) => {
          if (item.id === 'btn-d') {
            setIsMenuOpen(!isMenuOpen);
          } else {
            navigate(item.route);
            setIsMenuOpen(false);
          }
        },
      })),
    [navigate, isMenuOpen],
  );

  return (
    <div
      className={clsx(
        nav.nav,
        theme['nav-backgroundColor'],
        theme[`theme-${options.theme || 'default'}`],
        ' w-full shadow-x1/20 flex items-center pl-6 pr-5 gap-5 z-50',
      )}
      style={{ height: `${dimensions.navHeight}px` }}
    >
      <Logo width={dimensions.logoWidth} height={dimensions.logoHeight} action={handleLogoClick} />
      <div
        className="border rounded-full text-center"
        style={{
          fontSize: `${dimensions.versionFont}px`,
          marginLeft: `${dimensions.versionMargin}px`,
          paddingLeft: '0.3rem',
          paddingRight: '0.3rem',
        }}
      >
        {window.isStaticBuild ? 'Static Version' : 'v' + version}
      </div>
      <div className="flex items-center gap-5 ml-auto relative" style={{ height: 'calc(100% - 0.5rem)' }}>
        <NavItem items={items} />
        
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute right-0 top-full mt-2 w-48 bg-[#1f2937] border border-gray-700 rounded-xl shadow-2xl overflow-hidden py-1 z-[100]"
            >
              <button
                onClick={() => { navigate('/cheats'); setIsMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-200 hover:bg-[#374151] transition-colors"
              >
                <Zap size={16} className="text-yellow-400" />
                <span>Cheats</span>
              </button>
              <button
                onClick={() => { navigate('/credits'); setIsMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-200 hover:bg-[#374151] transition-colors"
              >
                <Heart size={16} className="text-pink-400" />
                <span>Credits</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
});

Nav.displayName = 'Nav';
export default Nav;
