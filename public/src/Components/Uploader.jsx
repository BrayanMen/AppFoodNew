import { useDropzone } from 'react-dropzone'
import { FiUploadCloud } from 'react-icons/fi';

function Uploader(){
  const { getRootProps, getInputProps} = useDropzone({
    multiple: false,
    maxSize:100000,
    onDrop: (acceptedFiles)=>{
      alert(acceptedFiles[0].name);
    }
  })
  return(
    <div className='w-full text-center'>
      <div 
      {...getRootProps()}
      className='px-6 py-8 border-2 border-dashed border-blueP bg-black bg-opacity-40 rounded-md cursor-pointer'>
        <input {...getInputProps()}/>
        <span className='mx-auto flex-colo'>
          <FiUploadCloud/>
        </span>
        <p className='text-sm mt-2'>Drag your image here</p>
        <em className='text-xs text-gray-400'>(Only .jpg and .png file)</em>
      </div>
      </div>
  )
}

export default Uploader;