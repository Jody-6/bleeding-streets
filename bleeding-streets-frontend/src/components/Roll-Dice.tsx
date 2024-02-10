import React from 'react';
import D20 from './D20';
import D6 from './D6';

const RollDice: React.FC = () => {
    return (
        <div>
            <h3 className='text-5xl p-6 mb-10'>Roll Dice:</h3>
            <div className='mb-36'>
                <D20></D20>
            </div>
            <div className='mt-14'>
                <D6></D6>
            </div>
            
            
        </div>
    );
};

export default RollDice;
