import { Button } from "@nextui-org/react"
import { UploadIcon } from "lucide-react"
import { useCallback, useState } from "react"
import { FileWithPath, useDropzone } from 'react-dropzone'

type FileUploaderProps = {
    fieldChange: (FILES: File[]) => void
    mediaUrl: string,
}

const FileUploader = ({fieldChange, mediaUrl}: FileUploaderProps) => {
    const [file, setFile] = useState<File[]>([])
    const [FileUrl, setFileUrl] = useState(mediaUrl)

    const onDrop = useCallback(
        (acceptedFiles: FileWithPath[]) => {
            setFile(acceptedFiles)
            fieldChange(acceptedFiles)
            setFileUrl(URL.createObjectURL(acceptedFiles[0]))
        }, [fieldChange]
    )

    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpeg', '.jpg', '.gif']
        }
    })

    return (
        <div {...getRootProps()} className="flex items-center flex-col bg-gray-900 rounded-xl cursor-pointer">
        <input {...getInputProps()} className="cursor-pointer" />
            {
                FileUrl ?(
                    <>
                        <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
                            <img src={FileUrl} alt="image" className="w-full h-full" />
                        </div>

                        <p className="text-default-400">Clique ou traga uma foto para substituir</p>
                    </>
                ): (
                    <div>
                        <UploadIcon width={96} height={77} />

                        <h3 className="text-default-400 text-2xl mb-2 mt6">Arraste e solte uma imagem</h3>

                        <p className="text-default-400 text-sm">SVG, PNG, JPG</p>

                        <Button>
                            Selecione do computador
                        </Button>
                    </div>
                )
            }
        </div>
    )
}

export default FileUploader