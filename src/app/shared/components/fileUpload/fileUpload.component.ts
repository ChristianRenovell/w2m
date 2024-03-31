import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FileRemoveEvent,
  FileUpload,
  FileUploadHandlerEvent,
  FileUploadModule,
} from 'primeng/fileupload';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule, FileUploadModule],
  templateUrl: './fileUpload.component.html',
  styleUrls: ['./fileUpload.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent {
  @Output() uploadFileEmitter: EventEmitter<any> = new EventEmitter();
  @Output() fileUploadSubjectEmitter: EventEmitter<any> = new EventEmitter();
  @ViewChild(FileUpload) fileUpload!: FileUpload;
  uploadedFiles: any[] = [];

  constructor() {}

  onUpload(event: FileUploadHandlerEvent) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.uploadFileEmitter.emit(this.uploadedFiles);
    this.fileUploadSubjectEmitter.emit(this.reset);
  }

  onRemoveFile(event: FileRemoveEvent) {
    const removedFileIndex = this.uploadedFiles.findIndex(
      (file) => file.name === event.file.name
    );
    if (removedFileIndex !== -1) {
      this.uploadedFiles.splice(removedFileIndex, 1);
    }
  }

  reset = () => {
    if (this.fileUpload) {
      this.uploadedFiles = [];
      this.fileUpload.clear();
    }
  };
}
