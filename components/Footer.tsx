import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div>
          <h4 className="font-semibold text-slate-800 dark:text-slate-200">Chuyên mục</h4>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2">
            <Link to="/category/tin-hoc-10" className="hover:text-cyan-500 transition-colors">Tin học 10</Link>
            <Link to="/category/tin-hoc-11" className="hover:text-cyan-500 transition-colors">Tin học 11</Link>
            <Link to="/category/tin-hoc-12" className="hover:text-cyan-500 transition-colors">Tin học 12</Link>
            <Link to="/category/thuat-toan-va-ctdl" className="hover:text-cyan-500 transition-colors">Thuật toán & CTDL</Link>
            <Link to="/category/tin-hoc-van-phong" className="hover:text-cyan-500 transition-colors">Tin học VP</Link>
            <Link to="/category/de-thi-dap-an" className="hover:text-cyan-500 transition-colors">Đề thi & Đáp án</Link>
            <Link to="/category/huong-dan" className="hover:text-cyan-500 transition-colors">Hướng dẫn</Link>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-8">
          <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Kết nối với chúng tôi</h4>
          <div className="flex flex-wrap gap-4">
            <a href="https://www.facebook.com/profile.php?id=61581439181186" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-cyan-500 transition-colors">
              <span>Facebook Fanpage</span>
            </a>
            <a href="https://www.facebook.com/groups/637693609151863" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-cyan-500 transition-colors">
              <span>Facebook Group</span>
            </a>
            <a href="https://discord.gg/dJbbjbHDpp" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-cyan-500 transition-colors">
              <span>Discord</span>
            </a>
            <a href="https://zalo.me/g/amgakz845" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-cyan-500 transition-colors">
              <span>Zalo Group</span>
            </a>
            <a href="mailto:neo.tinhocthptqg@gmail.com" className="text-slate-600 hover:text-cyan-500 transition-colors">
              <span>Email</span>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-center text-sm text-slate-500 dark:text-slate-400">
          <p className="order-2 sm:order-1 mt-4 sm:mt-0">&copy; {new Date().getFullYear()} New Era Orientation. All rights reserved.</p>
          <div className="order-1 sm:order-2 flex space-x-6">
            <Link to="/about" className="hover:text-cyan-500 transition-colors">Giới thiệu</Link>
            {/* <Link to="/contact" className="hover:text-cyan-500 transition-colors">Liên hệ</Link> */}
            <Link to="/terms" className="hover:text-cyan-500 transition-colors">Điều khoản</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
