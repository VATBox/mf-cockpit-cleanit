import { Directive, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDnd]',
})
export class DndDirective {
  @HostBinding('class.fileover') fileOver: boolean;
  @Output() fileDropped = new EventEmitter<any>();
  @Output() fileError = new EventEmitter<{ message: string }>();

  // Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
  }

  // Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt: {
    preventDefault: () => void;
    stopPropagation: () => void;
    dataTransfer: { files: any };
  }) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileError.emit({message: ''})
    this.fileOver = false;
    let files = evt.dataTransfer.files;
    if (files.length === 1) {
      if (files[0].type !== 'text/csv') {
        this.fileError.emit({ message: 'Supported only csv format' });
      } else {
        this.fileDropped.emit(files[0]);
      }
    }
    if (files.length > 1) {
      this.fileError.emit({ message: 'Supported only one file' });
    }
  }
}
