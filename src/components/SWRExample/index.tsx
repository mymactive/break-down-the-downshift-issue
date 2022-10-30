import { useCombobox } from 'downshift'
import { FC, startTransition, useState } from 'react'
import useSWR from 'swr'

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
const fetchBooks: FetchBooks = async (title: string | undefined) =>
  books.filter(
    (book) => !title || book.title.toLowerCase().startsWith(title.toLowerCase())
  )

export const SWRExample: FC = () => {
  const [title, setTitle] = useState<string | undefined>()

  const {
    getLabelProps,
    getInputProps,
    getMenuProps,
    getItemProps,
    isOpen,
    highlightedIndex
  } = useCombobox<Book>({
    items: [],
    itemToString: (item) => (item ? item.title : ''),
    onInputValueChange({ inputValue }) {
      startTransition(() => {
        setTitle(inputValue)
      })
    }
  })

  const { data } = useSWR<Book[]>(title, fetchBooks)

  return (
    <div>
      <h1 className="font-bold text-xl">SWR Example</h1>
      <label {...getLabelProps()}>
        <span className="block">Enter a book title:</span>
        <input className="border border-black" {...getInputProps()} />
      </label>
      <ul {...getMenuProps()}>
        {isOpen &&
          !!data &&
          data.map((item, index) => (
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
