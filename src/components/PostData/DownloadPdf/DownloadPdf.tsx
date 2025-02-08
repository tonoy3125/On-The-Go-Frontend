import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Eye } from "lucide-react";
import { toast } from "sonner";

const DownloadPdf = ({ id }: { id: string }) => {
  const downloadPdf = () => {
    const PostElement = document.getElementById(`post-${id}`);

    if (!PostElement) {
      return toast.error("This content is not downloadable");
    }

    html2canvas(PostElement, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 190; // Adjust width according to your need
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // Adding image to PDF
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const date = new Date().toLocaleDateString();

      pdf.save(`post-${date}.pdf`);
    });
  };

  return (
    <DropdownMenuItem
      className="flex items-center gap-[5px]"
      onClick={downloadPdf}
    >
      <Eye width={15} /> Download PDF
    </DropdownMenuItem>
  );
};

export default DownloadPdf;
