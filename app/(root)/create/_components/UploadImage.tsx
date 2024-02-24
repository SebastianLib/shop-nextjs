import { UploadButton } from '@/utils/uploadthing';
import Image from 'next/image';

interface UploadImageProps{
    image: string | undefined,
    setImage: React.Dispatch<React.SetStateAction<any>>
}

const UploadImage = ({image, setImage}:UploadImageProps) => {
  return (
    <div className="flex gap-4 flex-col">
    <div className="h-48 mx-auto w-40 bg-gray-100 border border-gray-300 rounded-xl flex items-center justify-center cursor-pointer">
      {image ? (
        <Image
          alt="image"
          src={image}
          width={200}
          height={200}
          className="w-full h-full object-center object-contain"
        />
      ) : (
        <h2 className="text-gray-500">Product image</h2>
      )}
    </div>
    <div>
      <UploadButton
        endpoint="imageUploader"
        appearance={{
          button: {
            background: "#f9fafb",
            color: "#000",
            border: "1px solid #CDCDCD",
            width: "100%",
            borderRadius: "25px",
            padding: "27px",
            marginTop: "7px",
          },
        }}
        onClientUploadComplete={(res) => {
          setImage(res[0].url);
        }}
      />
    </div>
  </div>
  )
}

export default UploadImage