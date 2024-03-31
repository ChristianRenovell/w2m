import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FileUploadComponent } from './fileUpload.component';
import { CommonModule } from '@angular/common';
import { FileRemoveEvent, FileUploadModule } from 'primeng/fileupload';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FileUploadModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit uploaded files when onUpload is called', () => {
    const files: File[] = [
      new File(['file1 content'], 'file1.txt'),
      new File(['file2 content'], 'file2.txt'),
    ];
    spyOn(component.uploadFileEmitter, 'emit');
    component.onUpload({ files });
    expect(component.uploadFileEmitter.emit).toHaveBeenCalledWith(files);
  });

  it('should remove file from uploadedFiles and emit remove event when onRemoveFile is called', () => {
    const fileToRemove: File = new File(['file1 content'], 'file1.txt');
    component.uploadedFiles = [fileToRemove, { name: 'file2.txt' }];

    const removeEvent: FileRemoveEvent = {
      originalEvent: new MouseEvent('click'),
      file: fileToRemove,
    };

    spyOn(component.removeFileEmitter, 'emit');
    component.onRemoveFile(removeEvent);

    expect(component.uploadedFiles.length).toEqual(1);
    expect(component.uploadedFiles[0].name).toEqual('file2.txt');
    expect(component.removeFileEmitter.emit).toHaveBeenCalledWith(true);
  });

  it('should reset uploadedFiles and clear fileUpload when reset is called', () => {
    component.uploadedFiles = [{ name: 'file1.txt' }, { name: 'file2.txt' }];
    spyOn(component.fileUpload, 'clear');
    component.reset();
    expect(component.uploadedFiles.length).toEqual(0);
    expect(component.fileUpload.clear).toHaveBeenCalled();
  });
});
