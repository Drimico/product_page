import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import { fileUpload } from "../../api/requests";
import { Spinner } from "../ui/spinner";

interface ImagePlaceholderProps {
  onImageUpload?: (url: string) => void;
}

const ImagePlaceholder = ({ onImageUpload }: ImagePlaceholderProps = {}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadErrorMessage, setUploadErrorMessage] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    setUploadErrorMessage("");

    try {
      const response = await fileUpload(file);
      const proxiedUrl = `https://corsproxy.io/?${encodeURIComponent(response.location)}`;
      setUploadedImageUrl(proxiedUrl);
      setUploadErrorMessage("");
      onImageUpload?.(proxiedUrl);
    } catch (err) {
      setUploadErrorMessage("Image upload failed. Please try again.");
      setUploadedImageUrl("");
    } finally {
      setIsUploading(false);
    }
  };
  const deleteImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setUploadedImageUrl("");

    onImageUpload?.("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return (
    <label htmlFor="image">
      {uploadedImageUrl ? (
        <div className="w-full h-full flex flex-col ">
          <img src={uploadedImageUrl} alt="" className="w-full h-full object-cover rounded-full" />
          {uploadErrorMessage && <span className="text-red-500">{uploadErrorMessage}</span>}
          <button
            type="button"
            onClick={(e) => deleteImage(e)}
            className="absolute top-[90%] text-red-500 bg-red-300 text-2xl rounded-full p-2 font-raleway cursor-pointer hover:bg-red-500 hover:text-white"
          >
            Remove
          </button>
        </div>
      ) : isUploading ? (
        <div className="flex justify-center items-center w-full h-full">
          <Spinner />
        </div>
      ) : (
        <div className="border-10 border-dashed border-[#5d7e96] flex justify-center items-center cursor-pointer text-[#5d7e96] hover:text-[#5d7e967a] hover:border-[#5d7e967a] group w-full h-full rounded-full">
          <Plus
            size={100}
            className="transition-transform duration-300 group-hover:rotate-90 cursor-pointer"
          />
          <input
            type="file"
            id="image"
            multiple
            name="image"
            className="opacity-0 w-0 h-0"
            accept="image/*"
            ref={fileInputRef}
            onChange={uploadImage}
          />
        </div>
      )}
    </label>
  );
};
export default ImagePlaceholder;
