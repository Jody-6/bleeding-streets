import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SpinnerLarge from './Spinner-Large';

export default function Character(props: {token: string, isEdit: boolean}): JSX.Element {
  const { characterid } = useParams();

  const headers = { 'Authorization': `bearer ${props.token}` };

  const [isLoading, setIsLoading] = useState(false);

  const [character, setCharacter] = useState<any>({
    id: characterid,
    name: '',
    class: '',
    intelligence: 0,
    strength: 0,
    hitPoints: 0,
    defense: 0,
    weapon: {
      name: '',
      damage: 0
    },
    skills: [
      {
        name: '',
        damage: 0,
      }
    ]
  });

  const getCharacter = (id: string) => {
    setIsLoading(true);
    axios.get(`http://localhost:5236/api/Character/${id}`, { headers })
      .then(res => {
        let data = res.data.data
        setCharacter({...character, 
          name: data.name, 
          class: data.class,
          intelligence: data.intelligence,
          strength: data.strength,
          hitPoints: data.hitPoints,
          weapon: {
            name: data.weapon?.name,
            damage: data.weapon?.damage
          },
          skills: data.skills
        })
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      })

  };

  useEffect(() => {
    if (characterid) {
      getCharacter(characterid);
    }
  }, [])

  const handleSubmit = (e: any) => {
    e.preventDefault();

    let weaponPayload = {
      name: character.weapon.name,
      damage: character.weapon.damage,
      characterId: character.id
    };

    if (character.id) {
      setIsLoading(true);
      axios.post('http://localhost:5236/Weapon', weaponPayload, { headers })
        .catch(error => console.log(error));

      axios.put('http://localhost:5236/api/Character', character, { headers })
        .then(res => getCharacter(character.id))
        .catch(error => console.log(error));
        setIsLoading(false);
    } else {
      setIsLoading(true);
      axios.post('http://localhost:5236/api/Character', character, { headers })
        .catch(error => console.log(error));
      setIsLoading(false);

      // axios.post('http://localhost:5236/Weapon', {characterId: character.id, name: character.weapon.name, damage: character.weapon.damage}, { headers })
      //   .then(res => getCharacter(character.id))
      //   .catch(error => console.log(error));
    }
  }

  return (
    <> 
      {isLoading ? 
        <SpinnerLarge />
      : (
      <>
        { props.isEdit && character.id ?
          <h3 className='text-5xl p-6 pb-0'>Edit Character:</h3> : null
        }

        { character.id ?
          null : <h3 className='text-5xl p-6 pb-0'>Create New Character:</h3>
        }
        <form onSubmit={handleSubmit}>
          <div className="max-w-full rounded overflow-hidden shadow-2xl shadow-white flex mt-10">
            <div className='w-1/3 bg-black'>
              {character.name ? 
                <img className="w-full" src={require(`../images/${character.name.toLowerCase()}.png`)} alt="image"></img>
                : <img className="max-w-full" src={require('../images/bleeding-streets.png')} alt="hig"></img>
              }
                
            </div>
            <div className="px-6 py-4 w-2/3">
              <label className='flex items-baseline'>
                {props.isEdit ? <p className=''>Name:</p> : null}
                <input className={`w-full font-bold text-5xl mb-2 ${props.isEdit ? 'ml-4' : 'border-transparent no-outline'}`} type="text" readOnly={!props.isEdit} onChange={e => setCharacter({...character, name: e.target.value})} value={character.name}/>
              </label>
              <label className='flex items-baseline'>
                  <p>Class:</p>
                  <input className={`w-full ${props.isEdit ? 'ml-4 mb-4' : 'border-transparent no-outline'}`} type="text" readOnly={!props.isEdit} onChange={e => setCharacter({...character, class: e.target.value})} value={character.class}/>
              </label>
              <label className='flex items-baseline'>
                  <p className='mb-2'>Intelligence:</p>
                  <input className={`w-full ${props.isEdit ? 'ml-4 mb-4' : 'border-transparent no-outline'}`} type="text" readOnly={!props.isEdit} onChange={e => setCharacter({...character, intelligence: e.target.value})}  value={character.intelligence}/>
              </label>
              <label className='flex items-baseline'>
                  <p className='mb-2'>Strength:</p>
                  <input className={`w-full ${props.isEdit ? 'ml-4 mb-4' : 'border-transparent no-outline'}`} type="text" readOnly={!props.isEdit} onChange={e => setCharacter({...character, strength: e.target.value})}  value={character.strength}/>
              </label>
              <label className='flex items-baseline'>
                  <p className='mb-2 whitespace-nowrap'>Hit Points:</p>
                  <input className={`w-full ${props.isEdit ? 'ml-4 mb-4' : 'border-transparent no-outline'}`} type="text" readOnly={!props.isEdit} onChange={e => setCharacter({...character, hitPoints: e.target.value})}  value={character.hitPoints}/>
              </label>
              <h4 className='text-xl mb-2 mt-2'>Weapon</h4>
              <hr/>
              <label className='flex items-baseline'>
                  <div className='basis-1/2 flex items-baseline'>
                    <p className='mb-2 whitespace-nowrap'>Weapon:</p>
                    <input className={`w-full ${props.isEdit ? 'm-4' : 'border-transparent no-outline'}`} type="text" readOnly={!props.isEdit} onChange={e => setCharacter({...character, weapon: {...character.weapon, name: e.target.value} })} value={character.weapon.name}/>
                  </div>
                  <div className='basis-1/2 flex items-baseline'>
                    <p className='mb-2 whitespace-nowrap'>Damage:</p>
                    <input className={`w-full ${props.isEdit ? 'ml-4 mb-4' : 'border-transparent no-outline'}`} type="text" readOnly={!props.isEdit} onChange={e => setCharacter({...character, weapon: {...character.weapon, damage: e.target.value} })} value={character.weapon.damage}/>
                  </div>
              </label>
              <h4 className='text-xl mb-2 mt-2'>Skills</h4>
              <hr/>
              {character.skills?.map((skill: any) => (
                <label className='flex items-baseline'>
                  <div className='basis-1/2 flex items-baseline'>
                    <p className='mb-2 whitespace-nowrap'>Skill:</p>
                    <input className={`w-full ${props.isEdit ? 'm-4' : 'border-transparent no-outline'}`} type="text" readOnly={!props.isEdit} onChange={e => setCharacter({...character, skills: {...character.skills, name: e.target.value} })} value={skill.name}/>
                  </div>
                  <div className='basis-1/2 flex items-baseline'>
                    <p className='mb-2 whitespace-nowrap'>Damage:</p>
                    <input className={`w-full ${props.isEdit ? 'ml-4 mb-4' : 'border-transparent no-outline'}`} type="text" readOnly={!props.isEdit} onChange={e => setCharacter({...character, skills: {...character.skills, name: e.target.value} })} value={skill.damage}/>
                  </div>
                </label>
              ))}

              { props.isEdit ?
                <button className='button mt-4 mb-4'>Save</button> : null
              }
            </div>
          </div>
        </form>
      </>
      )}
    </>
  );
}