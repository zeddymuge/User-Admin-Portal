import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  user: User = {
    id: 0,
    name: '',
    email: '',
    role: ''
  };
  editMode = false;
  userForm: FormGroup ;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { 
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const userIdParam = this.route.snapshot.paramMap.get('id');
    if (userIdParam !== null) {
      const userId = +userIdParam;
      this.editMode = true;
      this.userService.getUserById(userId).subscribe((user) => {
        this.user = user;
      });
    }
  }

  get f() {
    return this.userForm.controls;
  }

//   submitForm(): void {
//     if (this.editMode) {
//       this.userService.updateUser(this.user).subscribe(() => {
//         this.router.navigate(['/users']);
//       });
//     } else {
//       this.userService.addUser(this.user).subscribe(() => {
//         this.router.navigate(['/users']);
//       });
//     }
//   }
// }
submitForm(): void {
  if (this.editMode && this.userForm.invalid) {
   
    return;
  }

  if (this.editMode) {
    this.userService.updateUser(this.user).subscribe(() => {
      this.router.navigate(['/users']);
    });
  } else {
    this.userService.addUser(this.user).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }
}

goBack(): void {
  this.router.navigate(['/users']);
}

}
