import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import dynamic from 'next/dynamic'
import { Popup, PopupProps } from 'react-leaflet'

import { AppConfig } from '#lib/AppConfig'
import { MarkerCategoriesValues } from '#lib/MarkerCategories'
import { Contribution } from '#src/types/Contribution'
import { Button } from '@nextui-org/react'
import { MapIcon } from '#components/Icons'
import { useEffect } from 'react'


interface LeafletPopupProps extends PopupProps {
  handlePopupClose: (active?: boolean) => void
  handleOpenLocation: () => void
  item: Contribution
}

const LeafletPopup = ({
  handlePopupClose,
  handleOpenLocation,
  item,
  ...props
}: LeafletPopupProps) => {
  const { name, description } = item



  return (
    <Popup {...props}>
      <div
        className="absolute bg-white shadow rounded-lg shadow-lg p-2"
        style={{
          marginLeft: `calc(-150px + ${AppConfig.ui.markerIconSize - 5}px)`,
          marginTop: -140,
        }}
      >
        <div className="flex flex-row justify-center pt-3" style={{ width: '300px' }}>
          <Button
            radius='full'
            isIconOnly
            variant='light'
            className="absolute right-3 top-3 inline-block text-dark z-[99999]"
            onPress={() => handlePopupClose(false)}
            size='sm'>
            <X className='z-1' size={AppConfig.ui.markerIconSize} />
          </Button>
          <div className="absolute left-0 top-0 mt-5 flex w-full justify-center">
            <div className='w-full flex items-center justify-center gap-2'>
              <MapIcon contribution={item} width={64} height={86}/>
            </div>
          </div>
          <div
            className="flex w-full flex-col justify-center p-3 pt-10 text-center"
            style={{ marginTop: AppConfig.ui.markerIconSize * 2 + 8 }}>
            <h3 className="m-0 text-lg font-bold leading-none">{name}</h3>
            <p className="m-0 text-secondary">{description}</p>
            <div className="mt-6 flex flex-row justify-between gap-2 p-2">
              <Button variant='shadow' className="gap-2 bg-secondary text-white" onPress={() => handlePopupClose()} size='md'>
                <ChevronLeft size={AppConfig.ui.menuIconSize} />
                Close
              </Button>
              <Button variant='shadow' color='success' className="gap-2 text-white" onPress={() => handleOpenLocation()} size='md'>
                Open
                <ChevronRight size={AppConfig.ui.menuIconSize} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Popup>
  )
}

export default LeafletPopup
