import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsGrid from '@/components/NewsGrid';
import LeadForm from '@/components/LeadForm';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 border-l-4 border-blue-600 pl-3 mb-6">
            LATEST BUSINESS NEWS
          </h1>
          <NewsGrid />
        </div>
      </main>
      <LeadForm />
      <Footer />
    </div>
  );
}
