import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadDocumentService } from 'src/app/services/upload-document.service';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css'],
})
export class UploadDocumentComponent implements OnInit {
  xmlContent: string | null = null;
  file: File | null = null;

  constructor(private uploadDocumentService: UploadDocumentService, private dialog: MatDialog) {}

  ngOnInit(): void { }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.xmlContent = e.target.result;
      };
      reader.readAsText(file);
      this.file = file;
    }
  }

  onUpload(): void {
    if (this.file) {
      const formData = new FormData();
      formData.append('file', this.file, this.file.name);
      this.uploadDocumentService.upload(formData).subscribe({
        next: (data) => {
          this.openDialog('Documento subido correctamente', false);
        },
        error: (error) => {
          console.log(error);
          this.openDialog('Hubo un error al subir el documento', true);
          this.onCancel();
        }
      });
    }
  }

  onCancel(): void {
    this.xmlContent = null;
    this.file = null;
  }

  openDialog(message: string, isError: boolean): void {
    this.dialog.open(ModalDialogComponent, {
      data: { message, isError }
    });
  }
}
