import axios from 'axios';
import { ALBUM_LIMIT } from '@/constants';

export function getUserProfile(accessToken) {
  const config = { headers: { 'Authorization': 'Bearer ' + accessToken } };
  return axios.get('https://api.spotify.com/v1/me', config)
}

export function getAlbums(accessToken, offset=0) {
  const config = { headers: { 'Authorization': 'Bearer ' + accessToken } };
  return axios.get(`https://api.spotify.com/v1/me/albums?limit=${ALBUM_LIMIT}&offset=${offset}`, config)
}