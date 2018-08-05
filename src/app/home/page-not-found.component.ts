import { Component } from '@angular/core';

@Component({
    template: `
        <div class="div-image"  >
                <h2 class='text-center mt-5'>
                We are looking for your page, but we can't find it.
                </h2>
                <h2 class='text-center'>
                        <a [routerLink]="['']">
                        <i class="fa fa-angle-double-left"></i>
                        Home</a>
                </h2>
        </div>
    `,
    styles:[`
        .div-image {
            margin-bottom: 100px; /* Margin bottom by footer height */
            background: url('../../assets/fox.jpg') no-repeat center center fixed;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
            position:fixed;
            width:100%;
            height:100%;
            top:0px;
            left:0px;
            z-index:1000;
        }

    `]
})
export class PageNotFoundComponent {
 }