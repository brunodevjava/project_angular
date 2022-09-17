import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoaderService} from "../../../services/loader.service";
import {Subscription} from "rxjs";
import {LoaderState} from "./loader";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {

  constructor(
    private loader: LoaderService,
  ) {
  }

  public show = false;
  private subscription: Subscription;

  ngOnInit(): void {
    this.subscription = this.loader.loaderState.subscribe((state: LoaderState) => setTimeout(() => {
      this.show = state.show;
    }, 0));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
