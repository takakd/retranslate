import React from 'react'

import { Service, ServiceImage } from '../../components/service-image'
import { render } from '../testUtils'

describe('ServiceImage', () => {
  it('matches google snapshot', async () => {
    const { asFragment } = render(<ServiceImage service={Service.AWS} />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches aws snapshot', async () => {
    const { asFragment } = render(<ServiceImage service={Service.AWS} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
