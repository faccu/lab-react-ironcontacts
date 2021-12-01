import "./App.css";
import contacts from './contacts.json';
import { useState } from "react";

const remainingContacts = [...contacts];
const initAgenda = remainingContacts.splice(0, 5);

function App() {
  const [agenda, setAgenda] = useState(initAgenda);

  const addContact = () =>{
    const randomIndex = Math.floor(Math.random() * remainingContacts.length);
    const randomContact = remainingContacts.splice(randomIndex, 1);
    setAgenda(agenda.concat(randomContact));
  }

  const sortByPop = () => {
    let popSorted = [...agenda]
    popSorted.sort( (a, b) => b.popularity - a.popularity)
    setAgenda(popSorted)
  }

  const sortByName = () => {
    let nameSorted = [...agenda]
    nameSorted.sort( (a, b) => {
      if (a.name < b.name) return -1 
      if (a.name > b.name) return 1
      return 0
    })
    setAgenda(nameSorted)
  }

  const deleteContact = (index) => {
    let newList = [...agenda]
    newList.splice(index, 1);
    setAgenda(newList);
  };

  return (
    <>
    <h1>IRONCONTACTS</h1>
    <button onClick={addContact}>Add Contact</button>
    <button onClick={sortByPop}>Sort by popularity</button>
    <button onClick={sortByName}>Sort by name</button>
    
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
          </tr>
        </thead>
        <tbody>
          {agenda.map((contact, index) => {
            return (
              <tr key={contact.id}>
                <td>
                  <img src={contact.pictureUrl} alt={contact.name} width="100px"/>
                </td>
                <td>{contact.name}</td>
                <td>{contact.popularity.toFixed(2)}</td>
                <td>{contact.wonOscar && "🏆"}</td>
                <td>{contact.wonEmmy && "🏆"}</td>
                <td>
                  <button onClick={ () => deleteContact(index)}>Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
    </>
  )
}
export default App;