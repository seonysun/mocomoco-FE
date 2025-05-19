import { Map, MapMarker } from 'react-kakao-maps-sdk';

type KakaoMapProps = {
  latitude: number;
  longitude: number;
};

export const KakaoMap = ({ latitude, longitude }: KakaoMapProps) => {
  return (
    <Map
      center={{ lat: latitude, lng: longitude }}
      style={{ width: '100%', height: '360px' }}
    >
      <MapMarker position={{ lat: latitude, lng: longitude }}>
        <div style={{ color: '#000' }}>약속장소</div>
      </MapMarker>
    </Map>
  );
};
