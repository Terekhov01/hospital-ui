/*import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DoctorScheduleService } from '../_services/doctor-schedule.service';

interface Pokemon {
    value: string;
    viewValue: string;
  }
  
  interface PokemonGroup {
    disabled?: boolean;
    name: string;
    pokemon: Pokemon[];
  }

@Component({
  selector: 'app-material-multi-selector',
  templateUrl: './material-multi-selector.component.html',
  styleUrls: ['./material-multi-selector.component.css']
})
export class MaterialMultiSelectorComponent implements OnInit
{
    multiPicker = new FormControl();

    public pokemonGroups: PokemonGroup[] = [
        {
          name: 'Grass',
          pokemon: [
            {value: 'bulbasaur-0', viewValue: 'Bulbasaur'},
            {value: 'oddish-1', viewValue: 'Oddish'},
            {value: 'bellsprout-2', viewValue: 'Bellsprout'},
          ],
        },
        {
          name: 'Water',
          pokemon: [
            {value: 'squirtle-3', viewValue: 'Squirtle'},
            {value: 'psyduck-4', viewValue: 'Psyduck'},
            {value: 'horsea-5', viewValue: 'Horsea'},
          ],
        },
        {
          name: 'Fire',
          disabled: true,
          pokemon: [
            {value: 'charmander-6', viewValue: 'Charmander'},
            {value: 'vulpix-7', viewValue: 'Vulpix'},
            {value: 'flareon-8', viewValue: 'Flareon'},
          ],
        },
        {
          name: 'Psychic',
          pokemon: [
            {value: 'mew-9', viewValue: 'Mew'},
            {value: 'mewtwo-10', viewValue: 'Mewtwo'},
          ],
        },
      ];

    //@Input()
    //toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];


    constructor(private doctorSchedule: DoctorScheduleService)
    {}

    ngOnInit(): void
    {
        this.doctorSchedule.getDoctorShortInfo().subscrive({
            next: (value) =>
            {

            },
            error: (error) =>
            {

            }
        });
    }

}*/