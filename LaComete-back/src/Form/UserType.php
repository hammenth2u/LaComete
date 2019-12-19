<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\Validator\Constraints as Assert;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('firstname', TextType::class, array ( 'attr'=> [
                                                        'placeholder' => 'PRENOM']))

            ->add('lastname', TextType::class, array ( 'attr'=> [
                                                        'placeholder' => 'NOM']))
            ->add('email', EmailType::class, [
                'constraints' => [new Assert\Email()],
                'attr'=> [
                    'placeholder' => 'E-MAIL']
            ])
            ->add('username', TextType::class, array ( 'attr'=> [
                                                        'placeholder' => 'NOM D\'UTILISATEUR']))

            ->add('password', PasswordType::class,[ 
                'required' => true,
                'constraints' => [new Assert\NotBlank(['normalizer' => 'trim'])],
                'attr'=> [
                    'placeholder' => 'MOT DE PASSE']
            ])

            //->addEventListener(FormEvents::PRE_SET_DATA, [$this, 'addPasswordField'])
            ->add('submit', SubmitType::class, [
                'label' => 'Inscription'
            ])
        ;
    }


    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }

    public function addPasswordField(FormEvent $event)
    {
        // Comm en JS, notre eventListener reçoit un objet Event correspondant à l'événement qui a déclenché notre fonction addPasswordField
        // Le dump nous montre, sur la route /register, que la propriété data de l'event est vide et que le formulaire est fourni dans cet objet.
        // dump($event);
        // récupère les data et le Form
        $form = $event->getForm();
        $data = $event->getData();
        // On peut donc tester si la propriété data de $event est nulll ou si elle contient un objet User
        if($data == null) {
            // Alors nous avrons affaire à un user en création (/register), on ajoute un champ password avec la contrainte NotBlank
            $form->add('password', RepeatedType::class, [
                'type' => PasswordType::class,
                'invalid_message' => 'Les champs de mot de passe doivent correspondre.',
                // 'options' => ['attr' => ['class' => 'password-field']],
                'required' => true,
                'first_options'  => [ 'attr'=> [
                    'class' => 'form-control input-register',
                    'placeholder' => 'MOT DE PASSE']],
                'second_options' => [ 'attr'=> [
                    'class' => 'form-control input-register',
                    'placeholder' => 'RETAPEZ VOTRE MOT DE PASSE']],
                'constraints' => [new Assert\NotBlank(['normalizer' => 'trim'])]
            ]);
        } else {
            // Sinon, on ajoute un champs password sans la contrainte mais avec un placeholder
            $form
            ->add('password', RepeatedType::class, [
                'type' => PasswordType::class,
                'invalid_message' => 'Les champs de mot de passe doivent correspondre.',
                // 'options' => ['attr' => ['class' => 'password-field']],
                'required' => false,
                'first_options'  => [
                    'label' => 'Mot de passe',
                    'attr' => [
                        'placeholder' => 'Laissez-vide si inchangé'
                        ]
                    ],
                'second_options' => [
                    'label' => 'Retapez-le',
                    'attr' => [
                        'placeholder' => '…'
                        ]
                    ]
            ])
            ->remove('submit')
            ->add('submit', SubmitType::class, [
                'label' => 'Mettre à jour'
            ])
            ;
        }
    }
}
