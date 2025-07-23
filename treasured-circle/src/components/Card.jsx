import React from 'react';
import styles from './Card.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // ✅ NEW

const Card = ({
  icon, // ✅ Already present
  image,
  title,
  description,
  buttonText,
  href,
  onButtonClick,
  variant = 'default',
  fullWidth = false,
  className = '',
  children
}) => {
  const cardClass = [
    styles.card,
    styles[variant],
    fullWidth ? styles.fullWidth : ''
  ].join(' ');

  const cardContent = (
    <>
      {/* ✅ Show image if passed */}
      {image && (
        <img
          src={image}
          alt={title || 'Card image'}
          className={
            variant === 'welcome'
              ? styles['card-welcome-img']
              : variant === 'resources'
              ? styles.resourceImage
              : styles.image
          }
        />
      )}

      {/* ✅ NEW: Show icon if image not passed */}
      {!image && icon && (
        <div className={styles.iconContainer}>
          <FontAwesomeIcon icon={icon} className={styles.icon} />
        </div>
      )}

      {/* ✅ Title */}
      {title && variant === 'resources' ? (
        <h3 className={styles.resourceTitle}>{title}</h3>
      ) : (
        <h3 className={styles.title}>{title}</h3>
      )}

      {/* ✅ Description */}
      {description && variant !== 'resources' && (
        <p
          className={`${styles.description} ${
            variant === 'cta' ? styles.ctaDescription : ''
          }`}
        >
          {description}
        </p>
      )}

      {/* ✅ Children (if any) */}
      {children}

      {/* ✅ Button or Link */}
      {buttonText && variant !== 'resources' && (
        href ? (
          <Link
            to={href}
            className={`${styles.cardButton} ${
              variant === 'hero' || variant === 'cta' ? styles.heroButton : ''
            }`}
            style={
              variant === 'hero' || variant === 'cta'
                ? { backgroundColor: 'white', color: '#1d4ed8' }
                : {}
            }
          >
            {buttonText}
          </Link>
        ) : (
          <button
            className={styles.cardButton}
            onClick={onButtonClick}
            style={
              variant === 'hero' || variant === 'cta'
                ? { backgroundColor: 'white', color: '#1d4ed8' }
                : {}
            }
          >
            {buttonText}
          </button>
        )
      )}
    </>
  );

  if (variant === 'resources' && href) {
    return (
      <Link to={href} className={`${cardClass} ${className}`}>
        {cardContent}
      </Link>
    );
  }

  return (
    <div className={`${cardClass} ${className}`}>
      {cardContent}
    </div>
  );
};

export default Card;
