import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PostForm from '@/components/PostForm';

export default function PostPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <PostForm />
      </main>
      <Footer />
    </div>
  );
}
