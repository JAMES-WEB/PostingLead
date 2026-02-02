export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">BERNAMABiz</h3>
          <p className="text-gray-400 text-sm">
            Your trusted source for business news, market data, and economic insights.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Sections</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white">Market</a></li>
            <li><a href="#" className="hover:text-white">Economy</a></li>
            <li><a href="#" className="hover:text-white">Corporate</a></li>
            <li><a href="#" className="hover:text-white">CareBiz</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Connect</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white">Facebook</a></li>
            <li><a href="#" className="hover:text-white">Twitter</a></li>
            <li><a href="#" className="hover:text-white">LinkedIn</a></li>
            <li><a href="#" className="hover:text-white">Instagram</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Contact</h4>
          <p className="text-gray-400 text-sm">
            Wisma Bernama, No. 28 Jalan 1/65A,<br />
            Off Jalan Tun Razak, 50400 KL.<br />
            Email: helpdesk@bernama.com
          </p>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} BERNAMA. All rights reserved.
      </div>
    </footer>
  );
}
