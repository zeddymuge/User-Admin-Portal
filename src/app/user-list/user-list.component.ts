import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { fadeInOut } from '../animation';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  animations: [fadeInOut]
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchQuery: string = '';
  currentPage = 1;
  usersPerPage = 10;
  loading = true;
  errorMessage = ''; 
  isLoading = false;


  constructor(
    private userService: UserService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.isLoading = true;
    
    setTimeout(() => {
      this.userService.getUsers().subscribe((users) => {
        this.users = users;
        this.filteredUsers = users;
        this.loading = false;
        this.isLoading = false; 
      },
      (error) => {
        this.loading = false;
        if (error.status) {
          this.errorMessage = this.getErrorMessages(error.status) || 'An error occurred.';
        } else {
          this.errorMessage = 'An error occurred while fetching api.';
        }
      }
    );
  }, 1000); 
  }

  private getErrorMessages(statusCode: number): string | undefined {
    const errorMessages: { [key: number]: string } = {
      400: 'Bad request. Please check your input.',
      401: 'Unauthorized. Please log in again.',
      403: 'Access denied. You do not have permission.',
      404: 'Resource not found. The requested item does not exist.',
      500: 'Internal server error. Please try again later.'
    };

    return errorMessages[statusCode];
  }
  loadUsers(): void {
    this.loading = true;
  
    const userObserver: Observer<User[]> = {
      next: (users) => {
        this.users = users;
        this.filteredUsers = users;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = 'Failed to load users. Please try again later.';
        console.error('Error loading users:', error);
      },
      complete: () => {
        console.log('completed');
      }
    };
    this.userService.getUsers().subscribe(userObserver);
}

  editUser(userId: number): void {
    this.router.navigate(['/users/edit', userId]);
  };

  deleteUser(userId: number): void {
    const confirmDialog = confirm('Are you sure you want to delete this user?');
  
    if (confirmDialog) {
      const deleteObserver: Observer<void> = {
        next: () => {
          this.users = this.users.filter((user) => user.id !== userId);
        },
        error: (error) => {
          this.errorMessage = 'Failed to delete user. Please try again later.';
          console.error(error);
        },
        complete: () => {
          console.log('deleted');
        }
      };
  
      this.userService.deleteUser(userId).subscribe(deleteObserver);
    }
  }

  navigateToAddUser(): void {
    this.router.navigate(['/users/add']);
  };
  filterUsers(): void {
    this.filteredUsers = this.users.filter((user) =>
      user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  };

  get paginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.usersPerPage;
    return this.users.slice(startIndex, startIndex + this.usersPerPage);
  }
}
