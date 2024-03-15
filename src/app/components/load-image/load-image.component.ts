import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-load-image',
  templateUrl: './load-image.component.html',
  styleUrls: ['./load-image.component.scss']
})
export class LoadImageComponent implements OnInit {
  @Input() isRegisted: boolean = false;
  @Input() isDetail: boolean = false;
  @Output() sendImage = new EventEmitter<any>();
  imageUrl: string = '';
  nameImage: string = '';
  formatDNI: string = '';
  user: any;
  constructor() { }

  ngOnInit(): void {
    const userInfo = localStorage.getItem('userInfo');
    if (this.isRegisted && userInfo) {
      this.user = JSON.parse(userInfo);
      this.imageUrl = this.user.image;
    }
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.nameImage = file.name;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result as string;
        this.sendImage.emit(this.imageUrl);
      };
    }
  }

  formatId(number: string) {
    if (number.length < 9) return  number;
    else return  number.slice(0, 8) + '-' + number.slice(8);
  }

  deleteImage() {
    this.nameImage = '';
    this.imageUrl = '';
  }

}
