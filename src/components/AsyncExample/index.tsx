import { useCombobox } from 'downshift'
import { FC, startTransition, useState } from 'react'

type Book = { author: string; title: string }

const books: Book[] = [
  { author: 'Harper Lee', title: 'To Kill a Mockingbird' },
  { author: 'Lev Tolstoy', title: 'War and Peace' },
  { author: 'Fyodor Dostoyevsy', title: 'The Idiot' },
  { author: 'Oscar Wilde', title: 'A Picture of Dorian Gray' },
  { author: 'George Orwell', title: '1984' },
  { author: 'Jane Austen', title: 'Pride and Prejudice' },
  { author: 'Marcus Aurelius', title: 'Meditations' },
  { author: 'Fyodor Dostoevsky', title: 'The Brothers Karamazov' },
  { author: 'Lev Tolstoy', title: 'Anna Karenina' },
  { author: 'Fyodor Dostoevsky', title: 'Crime and Punishment' }
]

type FetchBooks = (title: string | undefined) => Promise<Book[]>
const fetchBooks: FetchBooks = async (title) =>
  books.filter(
    (book) => !title || book.title.toLowerCase().startsWith(title.toLowerCase())
  )

export const AsyncExample: FC = () => {
  const [items, setItems] = useState(books)

  const {
    getLabelProps,
    getInputProps,
    getMenuProps,
    getItemProps,
    isOpen,
    highlightedIndex
  } = useCombobox<Book>({
    items,
    itemToString: (item) => (item ? item.title : ''),
    onInputValueChange: async ({ inputValue }) => {
      const r = await fetchBooks(inputValue)
      startTransition(() => {
        setItems(r)
      })
    }
  })

  return (
    <div>
      <h1>Async Example</h1>
      <label {...getLabelProps()}>
        <span className="block">Enter a book title:</span>
        <input className="border border-black" {...getInputProps()} />
      </label>
      <ul {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <li
              key={item.title}
              style={{
                backgroundColor:
                  highlightedIndex === index ? 'lightgray' : 'white'
              }}
              {...getItemProps({
                item,
                index
              })}
            >
              <span>{item.title}</span>
              <span>{item.author}</span>
            </li>
          ))}
      </ul>
    </div>
  )
}