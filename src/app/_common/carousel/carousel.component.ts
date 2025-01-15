import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-carousel',
    imports: [CommonModule],
    templateUrl: './carousel.component.html',
    styleUrls: ['../../app.component.css', './carousel.component.css']
})
export class CarouselComponent {
    title = 'carousel';
    
    @Input() images: string[] = [];
    @Input() slideInterval = 3000;

    selectedIndex = 0;
    selectImage(i: number): void {
        this.selectedIndex = i;
    }

    autoSlideImages(): void {
        setInterval(() => {
            if (this.selectedIndex === this.images.length - 1) {
                this.selectedIndex = 0;
            } else this.selectedIndex++;
        }, this.slideInterval)
    }

    ngOnInit() {
        this.autoSlideImages();
    }
}
  