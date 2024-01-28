import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import Modal from './Modal';
import SpinnerLarge from './Spinner-Large';

export default function Characters(props: {token: string, username: string, setIsEdit: any}): JSX.Element {
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [characters, setCharacters] = useState<any[]>([]);
    const headers = { 'Authorization': `bearer ${props.token}` };
    const [isLoading, setIsLoading] = useState(false);

    const getCharacters = () => {
      setIsLoading(true);  
      axios.get('http://localhost:5236/api/Character/GetAll', { headers })
      .then(response => {
        setCharacters(response.data.data)
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error)
        setIsLoading(false);
      })
    };

    useEffect(() => {
          getCharacters();
    }, [])

    const deleteCharacter = (characterId: number) => {
      setIsLoading(true);
      axios.delete(`http://localhost:5236/api/Character/${characterId}`, { headers })
        .then(res => getCharacters())
        .catch(error => console.log(error));

      setDeleteModalIsOpen(false);
      setIsLoading(false);
    }

  return (
    <>
      {isLoading ? 
          <SpinnerLarge />
        : (
        <>
          <h1 className='text-5xl capitalize p-6'>{props.username}'s Characters:</h1>

          <div className='flex gap-4 flex-wrap justify-center mt-10'>
            {characters?.map((character) => (
              <div className="max-w-64 rounded overflow-hidden shadow-2xl shadow-white">
                <div className='bg-black'>
                  <img className="w-full" src={require(`../images/${character.name.toLowerCase()}.png`)} alt="image"></img>
                </div>

                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{character.name}</div>
                </div>
                <footer className='flex justify-between pb-3'>
                  <NavLink className='flex-1 text-center blue-text-button' onClick={() => props.setIsEdit(false)} to={`character/${character.id}`}><a>View</a></NavLink>               
                  <NavLink className='flex-1 text-center blue-text-button' onClick={() => props.setIsEdit(true)}  to={`character/${character.id}`}><a>Edit</a></NavLink>
                  <NavLink className='flex-1 text-center red-text-button' onClick={() => setDeleteModalIsOpen(true)} to={'/'}><a>Delete</a></NavLink>
                  <Modal isOpen={deleteModalIsOpen} onConfirm={() => deleteCharacter(character.id)} onClose={() => setDeleteModalIsOpen(false)}></Modal>
                </footer>
              </div>
            ))}
            {/* Create New Character */}
            <div className="max-w-64 rounded overflow-hidden shadow-2xl shadow-white flex flex-col justify-between">
              <img className="w-full" src={require('../images/bleeding-streets.png')} alt="image"></img>

              <footer className='flex justify-between pb-3'>         
                <NavLink className='flex-1 text-center blue-text-button' onClick={() => props.setIsEdit(true)} to={'character'}><a>Create New Character</a></NavLink>
              </footer>
            </div>
          </div>
        </>
      )}
    </>
  );
}