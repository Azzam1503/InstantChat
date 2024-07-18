import React from 'react'

const Conversation: React.FC = () => {
  return (
    <>
        <div className='flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer'>
            <div className="avatar online">
                <div className="w-12 rounded-full">
                    <img src="https://cdne.iconfinder.com/data/icons/communication-line-10/24/" className='' alt="" />
                </div>
            </div>

            <div className="flex flex-col flex-1">
                <div className='flex gap-3 justify-between'>
                    <p className='font-bold text-gray-200'>
                        <span className="text-xl">🐆</span>
                    </p>
                </div>
            </div>
        </div>
    </>
  ) 
}

export default Conversation
