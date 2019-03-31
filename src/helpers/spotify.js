import axios from 'axios';
import { albumLimit } from '@/constants';

export function getUserProfile(accessToken) {
  const config = { headers: { 'Authorization': 'Bearer ' + accessToken } };
  return axios.get('https://api.spotify.com/v1/me', config)
}

export function getAlbums(accessToken, offset=0, limit=20) {
  const config = { headers: { 'Authorization': 'Bearer ' + accessToken } };
  return axios.get(`https://api.spotify.com/v1/me/albums?limit=${albumLimit}&offset=${offset}`, config)
}