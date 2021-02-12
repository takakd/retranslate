import React from 'react'

/**
 * Translation API service name
 */
export enum Service {
  AWS = 'aws',
  Google = 'google',
}

/**
 * ServiceImage component props
 */
export class ServiceImageProps {
  /**
   * Translation API service name
   */
  service: Service
}

/**
 * ServiceImage component
 *
 * @param {ServiceImageProps} props
 */
export const ServiceImage = (props: ServiceImageProps) => {
  if (props.service === Service.Google) {
    return <img src="/logo-google.png" alt="google" width="20" height="20" />
  } else if (props.service === Service.AWS) {
    return <img src="/logo-aws.png" alt="aws" width="28" height="20" />
  }
}
