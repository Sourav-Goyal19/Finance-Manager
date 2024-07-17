import { useCSVReader } from "react-papaparse";

import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface UploadButtonProps {
  onUpload: (results: any) => void;
}

export const UploadButton: React.FC<UploadButtonProps> = ({ onUpload }) => {
  const { CSVReader } = useCSVReader();
  return (
    <CSVReader onUploadAccepted={onUpload}>
      {({ getRootProps }: any) => (
        <Button size={"sm"} className="w-full lg:w-auto" {...getRootProps()}>
          <Upload className="mr-2 h-4 w-4" /> Import CSV
        </Button>
      )}
    </CSVReader>
  );
};
