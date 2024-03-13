import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-load-image',
  templateUrl: './load-image.component.html',
  styleUrls: ['./load-image.component.scss']
})
export class LoadImageComponent implements OnInit {
  @Input() isImageLoad: boolean = false;
  @Output() sendImage = new EventEmitter<any>();
  imageUrl: string = '';
  user: any;
  constructor() { }

  ngOnInit(): void {
    const userInfo = localStorage.getItem('userInfo');
    if (this.isImageLoad && userInfo) {
      this.user = JSON.parse(userInfo);
      this.imageUrl = this.user.image;
    }
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result as string;
        this.sendImage.emit(this.imageUrl);
      };
    }
  }

}
