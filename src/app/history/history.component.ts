import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from 'src/app/models/transaction';
import { CardService } from 'src/app/services/card.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  protected transactions: Transaction[] = [];

  constructor(private cardService: CardService, private userService: UserService, private route: ActivatedRoute){}

  ngOnInit() 
  {
    const iban = this.route.snapshot.queryParamMap.get('iban');

    if(iban)
    {
      this.cardService.getTransactions(iban).subscribe((result) => {
        this.transactions = result;
      });
    }
  }

}
