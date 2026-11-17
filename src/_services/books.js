import API from '../_api';

export const getBooks = async () => {
    const response = await API.get('/books');
    return response.data;
};

export const createBook = async (bookData) => {
    const response = await API.post('/books', bookData);
    return response.data;
};

export const updateBook = async (id, bookData) => {
    const response = await API.put(`/books/${id}`, bookData);
    return response.data;
};

export const deleteBook = async (id) => {
    const response = await API.delete(`/books/${id}`);
    return response.data;
};