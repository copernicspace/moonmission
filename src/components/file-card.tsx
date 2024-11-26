import { FileIcon } from 'lucide-react'

interface FileCardProps {
  name: string
  size: string
  type: string
  icon?: React.ReactNode
}

export function FileCard({ name, size, type, icon = <FileIcon className="h-8 w-8" /> }: FileCardProps) {
  return (
    <div className="flex items-center gap-6 rounded-lg border-2 border-gray-200 p-6 hover:border-blue-600 transition-colors">
      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100">
        {icon}
      </div>
      <div className="flex-1">
        <p className="font-medium text-lg">{name}</p>
        <p className="text-sm text-gray-500">{size}</p>
      </div>
    </div>
  )
}

