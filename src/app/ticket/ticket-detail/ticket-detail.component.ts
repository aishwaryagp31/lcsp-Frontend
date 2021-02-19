import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from 'src/app/shared/ticket.service';
import { Ticket } from 'src/app/shared/ticket.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styles: [
  ]
})
export class TicketDetailComponent implements OnInit {
  form:NgForm;
  Id:any;
  ticket:any;


  constructor(public service:TicketService,
    private toastr:ToastrService,
    private router:Router,
    public actRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.service.refreshCommentList();
    this.Id=this.actRoute.snapshot.paramMap.get("id");
    this.loadTicketDetails();
  }
  loadTicketDetails(){
    this.service.getTicketDetail(this.Id).subscribe(tkt =>
      {
        this.ticket=tkt;
        this.service.formData.ticketId=this.ticket.ticketId;
      })
  }
  formSubmit(form:NgForm)
  {
      this.service.comment.ticketId=this.ticket.ticketId;
      this.service.postComment().subscribe(res=>
        {
          this.service.refreshCommentList();
          this.toastr.success("Comment added succesfully","Add Comment");
        },
        err=>{
          console.log('comment not added');
          
        });
      this.resetForm(form);

  }
  resetForm(form:NgForm)
  {
    form.reset();
    this.service.refreshCommentList();
  }

}
