import { BrowserRouter, Route, Routes } from "react-router-dom";
import Publiclayout from "./layouts/public";
import Home from "./pages/public";
import Books from "./pages/public/books";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import AdminLayout from "./layouts/admin";
import Dashboard from "./pages/admin";
import AdminBooks from "./pages/admin/books";
import BookCreate from "./pages/admin/books/create";
import AdminAuthors from "./pages/admin/authors";
import AdminTransactions from "./pages/admin/transactions";
import AdminGenres from "./pages/admin/genres";
import BookEdit from "./pages/admin/books/edit";
import AdminUsers from "./pages/admin/users";
import GenreCreate from "./pages/admin/genres/create";
import AuthorCreate from "./pages/admin/authors/create";
import GenreEdit from "./pages/admin/genres/edit";
import AuthorEdit from "./pages/admin/authors/edit";
import PublicBookShow from "./pages/public/books/show";
import About from "./pages/public/about";
import TransactionCreate from "./pages/admin/transactions/create";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute Publik / Customer */}
        <Route element={<Publiclayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/show/:id" element={<PublicBookShow />} />
          <Route path="/about" element={<About />} />
          <Route path="/transactions/create" element={<TransactionCreate />} />
        </Route>
        
        {/* Rute Autentikasi */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rute Dashboard Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="books" element={<AdminBooks />} />
          <Route path="books/create" element={<BookCreate />} />
          <Route path="authors" element={<AdminAuthors />} />
          <Route path="transactions" element={<AdminTransactions />} />
          <Route path="genres" element={<AdminGenres />} />
          <Route path="books/edit/:id" element={<BookEdit />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="genres/create" element={<GenreCreate />} />
          <Route path="authors/create" element={<AuthorCreate />} />
          <Route path="genres/edit/:id" element={<GenreEdit />} />
          <Route path="authors/edit/:id" element={<AuthorEdit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}