import { Component, Input, EventEmitter, Output, OnChanges, SimpleChange } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';

import { User } from './user';
import { UserService } from './user.service';
import { UserDialogComponent } from './user-dialog.component';
import { UtilsService } from '@app/core/service/utils.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
})
export class UserEditComponent implements OnChanges {

  private _label = 'Edit'; // TODO Is using a _label part of the public API ?
  @Input() existingUser: User;
  @Output() userEditedEvent: EventEmitter<User> = new EventEmitter<User>();

  userDialogRef: MatDialogRef<UserDialogComponent>;

  constructor(
    private matDialog: MatDialog,
    private utilsService: UtilsService,
    private userService: UserService
  ) { }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    const log: string[] = [];
    for (const propName of Object.keys(changes)) {
      const change = changes[propName];
      const currentValue  = JSON.stringify(change.currentValue);
      const previousValue = JSON.stringify(change.previousValue);
      const changedTo = JSON.stringify(change.currentValue);
      if (change.isFirstChange()) {
        log.push(`Initial value of ${propName} set to ${changedTo}`);
      } else {
        const changedFrom = JSON.stringify(change.previousValue);
        log.push(`${propName} changed from ${changedFrom} to ${changedTo}`);
      }
    }
    console.log(log.join(', '));
  }

  @Input()
  set label(label: string) {
    this._label = (label && label.trim()) || '<no label set>';
  }

  get label(): string {
    return this._label;
  }

  openUserDialog() {
    this.userDialogRef = this.matDialog.open(UserDialogComponent, {
      hasBackdrop: false,
      data: {
        user: this.existingUser
      }
    });

    this.userDialogRef
      .afterClosed()
      .subscribe(user => {
        // TODO validate the edited user
        if (user) {
          if (this.existingUser) {
            user.id = this.existingUser.id;
            this.userService.fullUpdate(user)
              .subscribe(updatedUser => {
                this.userEditedEvent.emit(updatedUser);
                this.utilsService.showSnackBar('The user ' + updatedUser.firstname + ' ' + updatedUser.lastname + ' has been updated.');
              });
          } else {
            this.userService.add(user)
              .subscribe(addedUser => {
                this.userEditedEvent.emit(addedUser);
                this.utilsService.showSnackBar('The user ' + addedUser.firstname + ' ' + addedUser.lastname + ' has been added.');
              });
          }
        }
      });
  }

}