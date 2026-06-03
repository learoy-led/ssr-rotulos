import {  AfterViewInit, ChangeDetectorRef, Component, ElementRef, forwardRef, OnDestroy, ViewChild } from '@angular/core';
import { iconPaths } from '../../data/data';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';

@Component({
  selector: 'app-rich-text',
    imports: [],
  providers: [   {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RichTextComponent),
      multi: true
    }
  ],
  templateUrl: './rich-text.component.html',
  styleUrl: './rich-text.component.css'
})
export class RichTextComponent  implements ControlValueAccessor, AfterViewInit, OnDestroy {

  @ViewChild('editorElement', { static: true })
  editorElement!: ElementRef;
  
  editor!: Editor;

  private onChange = (value: string) => {};
  private onTouched = () => {};

  value = '';
  disabled = false;
  touched = false;
  showRequiredError = false

  constructor(private cdr: ChangeDetectorRef) {}

  public boldPath:string = iconPaths.bold
  public italicPath: string = iconPaths.italic
  public listPath: string = iconPaths.list


 ngAfterViewInit(): void {

    this.editor = new Editor({
      element: this.editorElement.nativeElement,
      extensions: [StarterKit],
      content: this.value || '',

      onUpdate: ({ editor }) => {
        const html = editor.getHTML();
         const isEmpty =
    html === '<p></p>' ||
    html === '<p><br></p>';
        const value = isEmpty ? '' : html;
        console.log('value es' + value + 'touched es' + this.touched)
         this.value = value;
        this.onChange(value);
          this.showRequiredError = value === '' && this.touched;
      }
    });
this.editor.on('blur', () => {
    this.markTouched();
  });
  
        this.editor.on('selectionUpdate', () => {
      this.cdr.markForCheck();

    });
  }

 
  writeValue(value: string): void {
    this.value = value || '';
      if (!this.editor) return;
       const current = this.editor.getHTML();

    if (current !== this.value) {
      this.editor.commands.setContent(this.value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;

    if (this.editor) {
      this.editor.setEditable(!isDisabled);
    }
  }

  
  isActive(mark: string): boolean {
    return this.editor?.isActive(mark) ?? false;
  }


  markTouched(): void {
    this.touched = true;
    this.onTouched();
  }

 
  ngOnDestroy(): void {
    this.editor?.destroy();
  }

}
