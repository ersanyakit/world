import { Token } from '#src/types/web3.types'
import { Avatar, Button } from '@nextui-org/react'
import { useCallback, useEffect, useState } from 'react'
import useMapContext from '../../Map/useMapContext'
import L from 'leaflet'

export interface ChipProps {
  token: Token
  balance: string
}

// TokenChip component
const TokenChip = ({ token, balance }: ChipProps) => {
  // Access map context
  const { map } = useMapContext()


  
    const handleClick = () => {
      if (map) {
        // Zoom in
      
      const currentCenter = map.getCenter()

      // Check if currentCenter is valid
      if (currentCenter && currentCenter.lat && currentCenter.lng) {
        

       const customIcon = L.divIcon({
        className: 'custom-icon', // A custom class for styling
        html: `<img src="${token.logoURI}" alt="icon" class="w-32 h-32 rounded-full" />`, // Insert the image inside the div
        iconSize: [32, 32], // Size of the icon (adjust based on your needs)
        iconAnchor: [16, 16], // Point where the icon will be anchored
      });

        L.marker([currentCenter.lat, currentCenter.lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(`<b>${token.name}</b><br/>Balance: ${balance}`)
        .openPopup();
      } else {
        console.error('Unable to get current center coordinates')
      }
    }
  }



  return (
    <Button 
      className="w-full" 
      size="lg" 
      isIconOnly 
      radius="full"
      style={{ width: '64px', height: '64px' }} 
      onPress={handleClick}
    >
      <Avatar
        className="group transition-transform duration-300 ease-in-out transform group-hover:scale-110"
        size="lg" 
        src={token.logoURI} 
      />
    </Button>
  )
}

export default TokenChip