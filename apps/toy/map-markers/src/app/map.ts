import User from './user';
import { Markable } from '../interface/markable';
import InfoWindow = google.maps.InfoWindow;

let map: google.maps.Map;
const center: google.maps.LatLngLiteral = {lat: 0, lng: 0};

export class Map {
  private instance: google.maps.Map

  constructor() {
    this.instance =  new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center,
      zoom: 2,
    });
  }

  addMarker(target: Markable): void {
    const isUser = target instanceof User;
    const iconUrl = isUser
      ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScKMzHDt7pRwokSoOIKceCLWad9nr8ImSrXogBSmWupeTJNottAi7vL_TFhAxRAbQc_Zs&usqp=CAU'
      : 'https://cdn2.iconfinder.com/data/icons/mixed-rounded-flat-icon/512/briefcase-512.png';

    const marker = new google.maps.Marker({
      map: this.instance,
      animation: google.maps.Animation.DROP,
      icon: {
        url: iconUrl,
        scaledSize: new google.maps.Size(30, 30)
      },
      label: {
        color: isUser ? 'black': 'tomato',
        fontWeight: 'bold',
        text: isUser? `Candidate: ${target.name}` : `Company: ${target.name}`,
        className: 'marker-label'
      },
      position: {
        lat: target.location.lat,
        lng: target.location.lng
      }
    })

    const popup = new InfoWindow({
      content: target.description
    })
    popup.open({
      anchor: marker,
      map
    })
    marker.addListener('click', () => {
      popup.open({
        anchor: marker,
        map
      })
    })
  }



}
