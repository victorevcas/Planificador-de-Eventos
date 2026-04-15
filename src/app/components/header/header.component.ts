import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PerfilesService } from '../../services/perfiles.service';
import { Perfil } from '../../models/modelos';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  perfilActivo: Perfil | null = null;

  constructor(
    private perfilesService: PerfilesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.perfilesService.perfilActivo$.subscribe(p => {
      this.perfilActivo = p;
      this.cdr.markForCheck();
      this.cdr.detectChanges();
    });
  }
}
